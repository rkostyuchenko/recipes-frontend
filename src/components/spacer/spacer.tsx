type MarginValue = number | 'auto';

type Variants = {
  top?: MarginValue
  bottom?: MarginValue
  left?: MarginValue
  right?: MarginValue
  vertical?: never
  horizontal?: never
} | {
  horizontal?: MarginValue
  vertical?: MarginValue
  top?: never
  bottom?: never
  left?: never
  right?: never
}

const makeStyles = ({
  vertical,
  horizontal,
  top,
  right,
  bottom,
  left,
}: Record<string, MarginValue | undefined>) => {
  if (vertical !== undefined || horizontal !== undefined) {
    return {
      marginTop: vertical,
      marginBottom: vertical,
      marginRight: horizontal,
      marginLeft: horizontal,
    };
  }

  if (
    top !== undefined
    || right !== undefined
    || bottom !== undefined
    || left !== undefined
  ) {
    return {
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
    };
  }
}

const Spacer: React.FC<React.PropsWithChildren<Variants>> = (props) => {
  const {
    children,
    ...margins
  } = props;

  return (
    <div
      style={makeStyles(margins)}
    >
      {children}
    </div>
  );
}

export default Spacer;
