export type SimpleListItem = {
  text: string;
  sub_items?: SimpleListItem[];
};

export type Course = {
  course_code: string;
  course_name: string;
  description?: string;
  semester: string;
  difficulty: string;
  programming_language?: string;
  programming_details: SimpleListItem[];
  references_list: SimpleListItem[];
  topics_list: SimpleListItem[];
};
