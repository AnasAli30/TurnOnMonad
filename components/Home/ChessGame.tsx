import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Chessboard } from 'react-chessboard';
import { useFrame } from '@/components/farcaster-provider';

const socket = io('http://localhost:3001');

type InitPayload = { fen: string; color: 'white' | 'black' };
type MovePayload = { fen: string };
type GameoverPayload = { result: string };
type DropHandler = (sourceSquare: string, targetSquare: string) => boolean;

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8);
}

export default function ChessGame() {
  const { context } = useFrame();
  const [fen, setFen] = useState<string>('start');
  const [color, setColor] = useState<'white' | 'black'>('white');
  const [players, setPlayers] = useState<number>(0);
  const [roomId, setRoomId] = useState<string>('');
  const [inputRoom, setInputRoom] = useState<string>('');
  const [inGame, setInGame] = useState<boolean>(false);
  const [mode, setMode] = useState<'choose' | 'join' | 'create'>('choose');

  useEffect(() => {
    if (!inGame || !roomId) return;
    socket.emit('join', roomId);
    const handleInit = ({ fen, color }: InitPayload) => { setFen(fen); setColor(color); };
    const handleMove = ({ fen }: MovePayload) => setFen(fen);
    const handleGameover = ({ result }: GameoverPayload) => alert('Game Over: ' + result);
    const handlePlayers = (count: number) => setPlayers(count);
    socket.on('init', handleInit);
    socket.on('move', handleMove);
    socket.on('gameover', handleGameover);
    socket.on('players', handlePlayers);
    return () => {
      socket.off('init', handleInit);
      socket.off('move', handleMove);
      socket.off('gameover', handleGameover);
      socket.off('players', handlePlayers);
      socket.disconnect();
    };
  }, [inGame, roomId]);

  const onDrop: DropHandler = (sourceSquare, targetSquare) => {
    socket.emit('move', { roomId, from: sourceSquare, to: targetSquare });
    return true;
  };

  const handleCreateRoom = () => {
    const code = generateRoomCode();
    setRoomId(code);
    setInGame(true);
    setMode('create');
  };

  const handleJoinClick = () => {
    setMode('join');
  };

  const handleRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRoom.trim()) {
      setRoomId(inputRoom.trim());
      setInGame(true);
    }
  };

  if (!inGame) {
    if (mode === 'choose') {
      return (
        <div className="flex flex-col items-center w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
          <div className="mb-2 text-center font-bold">Start a Chess Game</div>
          <button onClick={handleCreateRoom} className="bg-green-500 text-white rounded px-4 py-2 w-full">Create Room</button>
          <button onClick={handleJoinClick} className="bg-blue-500 text-white rounded px-4 py-2 w-full">Join Room</button>
        </div>
      );
    }
    if (mode === 'create') {
      return (
        <div className="flex flex-col items-center w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
          <div className="mb-2 text-center font-bold">Room Created</div>
          <div className="text-center">Share this code with your friend:</div>
          <div className="text-2xl font-mono bg-gray-100 rounded p-2 select-all">{roomId}</div>
          <div className="text-center text-sm text-gray-600 mt-4">Waiting for another player to join...</div>
        </div>
      );
    }
    if (mode === 'join') {
      return (
        <div className="flex flex-col items-center w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
          <div className="mb-2 text-center font-bold">Join a Chess Room</div>
          <form onSubmit={handleRoomSubmit} className="w-full flex flex-col items-center space-y-2">
            <input
              className="border rounded p-2 w-full"
              placeholder="Enter room code (e.g. abc123)"
              value={inputRoom}
              onChange={e => setInputRoom(e.target.value)}
              required
            />
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 w-full">Join Room</button>
          </form>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto p-2 bg-white rounded-lg shadow-md">
      <div className="mb-2 text-center">
        <div className="font-bold">Room: <span className="font-mono">{roomId}</span></div>
        <div className="text-xs text-gray-500">Players connected: {players}/2</div>
        {context?.user && (
          <div className="text-xs mt-1">
            You: <span className="font-mono">{context.user.displayName}</span> (fid: <span className="font-mono">{context.user.fid}</span>)
          </div>
        )}
      </div>
      {players === 2 ? (
        <div className="flex justify-center items-center w-full" style={{ minHeight: 320 }}>
          <Chessboard
            position={fen}
            onPieceDrop={onDrop}
            boardOrientation={color}
            boardWidth={Math.min(window.innerWidth * 0.9, 350)}
          />
        </div>
      ) : (
        <div className="text-center text-sm text-gray-600 mt-4">Waiting for another player to join...</div>
      )}
    </div>
  );
} 