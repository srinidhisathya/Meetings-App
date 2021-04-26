import dateFormatConvert from './date.js';

describe( 'formatDate function', () => {
    it( 'should format in standard format when default format is used', () => {
        // arrange
        const date = '2019-01-01T04:00:00.000Z';

        // act
        const result = dateFormatConvert( date );
        
        // assert
        expect( result ).toBe( '1 January 2019 Tuesday' );
    });
});
