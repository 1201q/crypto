interface OptionType {
  name: string;
  select: boolean;
  type: string;
  count: number;
  unit: number;
}

const getBongFetchURL = (
  option: OptionType,
  selectCode: string | undefined
) => {
  const URL =
    option.type === "minutes"
      ? `/api/bong/minutes?minutes=${option.unit}`
      : `/api/bong/${option.type}`;
  const Param = `?market=${selectCode}&count=${option.count}`;
  return `${URL}${Param}`;
};

export default getBongFetchURL;
