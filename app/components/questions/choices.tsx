import { Select, SimpleGrid, type SelectProps } from "@mantine/core";
import { useFetcher } from "@remix-run/react";

type Props = {
  subjects: { label: string; value: string }[];
  subjectProps?: Omit<SelectProps, "data">;
  chapterProps?: Omit<SelectProps, "data">;
};

const Choices = (props: Props) => {
  const fetcher = useFetcher<{
    chapters: { label: string; value: string }[];
  }>();

  function handleSubjectSelect(value: string | null) {
    if (!value) return;
    fetcher.submit(
      {},
      { method: "post", action: "/questions/subject/" + value }
    );
  }

  return (
    <SimpleGrid cols={1} breakpoints={[{ minWidth: "md", cols: 2 }]}>
      <Select
        label="Pick a Subject"
        placeholder="Physics"
        data={props.subjects}
        variant="filled"
        onChange={handleSubjectSelect}
        {...props.subjectProps}
      />
      <Select
        label="Pick a Subject"
        placeholder="Chapter 1"
        data={fetcher.data?.chapters ?? []}
        variant="filled"
        name="tagId"
        disabled={!fetcher.data}
        {...props.chapterProps}
      />
    </SimpleGrid>
  );
};

export default Choices;
