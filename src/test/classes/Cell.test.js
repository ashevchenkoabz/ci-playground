import Cell from '../../classes/Cell';

describe('Cell.js', () => {
    it('should be an Object', () => {
        const cell = new Cell();
        expect(cell).toBeDefined();
    });

    it('should have randomizeColor method', () => {
        const cell = new Cell();
        expect(cell).toHaveProperty('randomizeColor')
    });
});
