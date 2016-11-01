import { positionService } from './position';

describe('positionService', () => {
    it('should give correct hight', () => {
        const div = document.createElement('div');
        div.style.height = '10px';
        div.style.padding = '0px 0px';
        div.style.border = '0px 0px';
        document.body.appendChild(div);
        expect(positionService.getStyle(div, 'height')).toBe('10px');
        div.remove();
    });

    it('should be focused', () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');

        document.body.appendChild(input);
        input.focus();
        expect(positionService.isFocused(input)).toBe(true);
        input.remove();
    });

    it('should give offset', () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.style.border = '0px';
        input.style.padding = '0px 0px';
        input.style.height = '20px';
        document.body.appendChild(input);
        let offsetShouldBe = parseInt(positionService.getStyle(document.body, 'margin-top').replace('px', ''), 10) +
            parseInt(positionService.getStyle(document.body, 'padding-top'), 10) +
            parseInt(positionService.getStyle(document.body, 'border-top-width'), 10);
        expect(positionService.offset(input).top).toBe(offsetShouldBe);
        input.remove();
    });

});
