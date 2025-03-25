export function inventorySwapC(player1, player2, player1indices = [0, 27], player2indices = [0, 27]) {
    for (let i = 0; i <
        Math.min(player1indices[1] - player1indices[0], player2indices[1] - player2indices[0]); i++) {
        player1.swapItems(i + player1indices[0], i + player2indices[0], player2);
    }
}
//# sourceMappingURL=inventorySwapC.js.map