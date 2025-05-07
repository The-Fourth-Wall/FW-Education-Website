export interface SimpleListItem {
  text: string;
  sub_items?: SimpleListItem[];
}

export interface Course {
  course_code: string;
  course_name: string;
  description?: string;
  semester: number;
  difficulty: string;
  programming_language?: string;
  programming_details: SimpleListItem[];
  references_list: SimpleListItem[];
  topics_list: SimpleListItem[];
}
