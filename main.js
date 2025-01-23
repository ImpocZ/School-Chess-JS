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
        const capturedPiece = targetSquare.querySelector('.piece');

        if (capturedPiece) {
            // Remove the captured piece from the target square
            capturedPiece.remove();
        }
        
        targetSquare.appendChild(piece);
    }

    isValidMove(piece, targetSquare) {
        const currentSquare = piece.parentElement;
        const currentIndex = this.board.indexOf(currentSquare);
        const targetIndex = this.board.indexOf(targetSquare);
    
        const pieceColor = piece.getAttribute('color');
        const direction = pieceColor === 'white' ? -1 : 1;
    
        // Calculate diagonal target squares for capturing
        const leftDiagonal = currentIndex + (8 * direction - 1);
        const rightDiagonal = currentIndex + (8 * direction + 1);
    
        // Check if the move is a one-step forward move
        if (targetIndex === currentIndex + 8 * direction && !targetSquare.querySelector('.piece')) {
            return true;
        }
    
        // Check if the move is a diagonal capture
        if (
            (targetIndex === leftDiagonal || targetIndex === rightDiagonal) &&
            targetSquare.querySelector('.piece') &&
            targetSquare.querySelector('.piece').getAttribute('color') !== pieceColor
        ) {
            return true;
        }
    
        // Otherwise, the move is invalid
        return false;
    }
}

// Initialize the board
document.addEventListener('DOMContentLoaded', () => {
    new ChessBoard();
});

// Made with the help of AI, since my programming skills alone are potato.