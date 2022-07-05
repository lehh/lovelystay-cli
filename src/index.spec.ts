import main from './index';

describe('main', () => {
  const validArgs = {
    some: {
      mock: {
        arg: jest.fn(),
      },
    },
  };

  beforeEach(() => {
    process.argv = [];
  });

  it('Should not throw error when command is invalid', () => {
    process.argv.push('1', '2', 'invalid', 'arg');

    expect(() => main(validArgs)).not.toThrow();
  });

  it('Should not throw error when command is incomplete', () => {
    process.argv.push('1', '2', 'some', 'mock');

    expect(() => main(validArgs)).not.toThrow();
  });

  it('Should call command function when command is valid and doesnt have a param', () => {
    process.argv.push('1', '2', 'some', 'mock', 'arg');

    main(validArgs);

    expect(validArgs.some.mock.arg).toBeCalled();
  });

  it('Should call command function with param when command is valid and has a param', () => {
    process.argv.push('1', '2', 'some', 'mock', 'arg', 'param');

    main(validArgs);

    expect(validArgs.some.mock.arg).toBeCalledWith('param');
  });
});
