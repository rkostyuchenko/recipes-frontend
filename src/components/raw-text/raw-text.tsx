interface Props {
  text: string;
}

const makeMarkup = (dirty: string) => ({
  __html: dirty,
});

const RawText: React.FC<Props> = ({ text }) => {
  return <div dangerouslySetInnerHTML={makeMarkup(text)} />;
};

export default RawText;
