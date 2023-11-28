export function classnames(...arg: Array<string | Record<string, boolean>>) {
  const classes: string[] = [];
  for (let index = 0; index < arg.length; index++) {
    const className = arg[index];
    if (typeof className === 'string') {
      classes.push(className);
    } else {
      Object.entries(className).forEach(([name, isValid]) => {
        if (isValid) {
          classes.push(name);
        }
      });
    }
  }
  return classes.join(' ');
}
