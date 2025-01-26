import { CapitalLettersPipe } from './capital-letters.pipe';

describe('CapitalLettersPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalLettersPipe();
    expect(pipe).toBeTruthy();
  });
});
