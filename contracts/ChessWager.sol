// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChessWager {
    enum GameState { Open, Started, Finished }
    struct Game {
        address player1;
        address player2;
        uint256 wager;
        GameState state;
        address winner;
    }

    mapping(uint256 => Game) public games;
    uint256 public nextGameId;

    event GameCreated(uint256 indexed gameId, address indexed player1, uint256 wager);
    event GameJoined(uint256 indexed gameId, address indexed player2);
    event GameFinished(uint256 indexed gameId, address indexed winner);

    function createGame() external payable returns (uint256 gameId) {
        require(msg.value > 0, "Wager must be > 0");
        gameId = nextGameId++;
        games[gameId] = Game({
            player1: msg.sender,
            player2: address(0),
            wager: msg.value,
            state: GameState.Open,
            winner: address(0)
        });
        emit GameCreated(gameId, msg.sender, msg.value);
    }

    function joinGame(uint256 gameId) external payable {
        Game storage game = games[gameId];
        require(game.state == GameState.Open, "Game not open");
        require(msg.value == game.wager, "Wager must match");
        require(msg.sender != game.player1, "Cannot join your own game");
        game.player2 = msg.sender;
        game.state = GameState.Started;
        emit GameJoined(gameId, msg.sender);
    }

    // Only callable by backend/oracle for now (off-chain winner determination)
    function finishGame(uint256 gameId, address winner) external {
        Game storage game = games[gameId];
        require(game.state == GameState.Started, "Game not started");
        require(winner == game.player1 || winner == game.player2, "Invalid winner");
        game.state = GameState.Finished;
        game.winner = winner;
        payable(winner).transfer(game.wager * 2);
        emit GameFinished(gameId, winner);
    }
} 