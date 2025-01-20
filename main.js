class ChessBoard {
    constructor() {
        // Make the board via class
        this.board = Array.from(document.querySelectorAll('.square')); 
        this.selectedPiece = null;
        this.startup();
    }

    startup() {
        this.board.forEach((square) => {
            square.addEventListener('click', (event) => this.handleSquareClick(event, square));
        });
    }

    handleSquareClick(event, square) {
        const piece = square.querySelector('.piece');

        if (this.selectedPiece) {
            // Move the selected piece
            if (this.isValidMove(this.selectedPiece, square)) {
                this.movePiece(this.selectedPiece, square);
            }
            this.deselectPiece();
        } else if (piece) {
            // Select the piece
            this.selectPiece(piece);
        }
    }

    selectPiece(piece) {
        this.selectedPiece = piece;
        piece.classList.add('selected');
    }

    deselectPiece() {
        if (this.selectedPiece) {
            this.selectedPiece.classList.remove('selected');
            this.selectedPiece = null;
        }
    }

    movePiece(piece, targetSquare) {
        targetSquare.appendChild(piece);
    }

    isValidMove(piece, targetSquare) {
        const currentSquare = piece.parentElement;
        const currentIndex = this.board.indexOf(currentSquare);
        const targetIndex = this.board.indexOf(targetSquare);

        const pieceColor = piece.getAttribute('color');
        const direction = pieceColor === 'white' ? -1 : 1;

        // Allow movement per one square forward -- More is to be implemented in time.
        return (
            targetIndex === currentIndex + 8 * direction &&
            !targetSquare.querySelector('.piece')
        );
    }
}

// Initialize the board
document.addEventListener('DOMContentLoaded', () => {
    new ChessBoard();
});

// Made with the help of AI, since my programming skills alone are potato.