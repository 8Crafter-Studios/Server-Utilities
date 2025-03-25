export type command_formats_type_list = (string | string[] | command_formats_type_list | {
    format: string | command_formats_type_list;
    description?: string;
})[] | string | {
    format: string | command_formats_type_list;
    description?: string;
};
