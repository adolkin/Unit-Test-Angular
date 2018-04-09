import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
  let pipe: DefaultPipe;

  beforeEach(() => {
    pipe = new DefaultPipe();
  })

  // Pipe classes have one function called transform so in order to test pipes 
  // we just need to test this one function, passing inputs and expecting outputs.
  it('providing no value returns fallback', () => {
    expect(pipe.transform('', 'http://place-hold.it/300')).toBe('http://place-hold.it/300');
  });

  it('providing a value returns value', () => {
    expect(pipe.transform('http://place-hold.it/300', 'fallback')).toBe('http://place-hold.it/300');
  });

  it('asking for https returns https', () => {
    expect(pipe.transform('', 'http://place-hold.it/300', true)).toBe('https://place-hold.it/300');
  });
});
