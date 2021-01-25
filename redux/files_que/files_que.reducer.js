export const ADD_FILE_TO_QUE = 'ADD_FILE_TO_QUE';
export const REMOVE_FILE_FROM_QUE = 'REMOVE_FILE_FROM_QUE';
export const UPLOAD_FILES_IN_QUE = 'UPLOAD_FILES_IN_QUE';

export const addFileToQue = ({ section_name, file, id }) => ({
  type: ADD_FILE_TO_QUE,
  section_name,
  file,
  id,
});
export const uploadFilesInQue = ({ files_in_que, token }) => ({
  type: UPLOAD_FILES_IN_QUE,
  files_in_que,
  token,
});
export const removeFileFromQue = ({ file, section_name }) => ({
  type: REMOVE_FILE_FROM_QUE,
  file,
  section_name,
});

const initialState = {
  tasks: [],
  tickets: [],
  entity_tasks: [],
};

const filesQueReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILE_TO_QUE: {
      const { section_name, file, id } = action;
      return { ...state, [section_name]: [...state[section_name], { file, id }] };
    }
    case REMOVE_FILE_FROM_QUE: {
      const { section_name, file } = action;
      const newQue = state[section_name].filter((item) => item.file.uri !== file.uri);

      return { ...state, [section_name]: newQue };
    }
    default: {
      return state;
    }
  }
};

export default filesQueReducer;
