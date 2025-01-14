export const fileIconByExtension = (extension: string): string => {
  switch (extension) {
    case "txt":
      return "vscode-icons:file-type-text";
    case "pdf":
      return "vscode-icons:file-type-pdf2";
    case "doc":
    case "docx":
      return "vscode-icons:file-type-word";
    case "ppt":
    case "pptx":
      return "vscode-icons:file-type-powerpoint";
    case "xls":
    case "xlsx":
      return "vscode-icons:file-type-excel";
    case "zip":
      return "vscode-icons:file-type-zip";
    case "jpg":
    case "jpeg":
    case "png":
    case "svg":
      return "vscode-icons:file-type-image";
    case "webp":
      return "vscode-icons:file-type-webp";
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
      return "vscode-icons:file-type-video";
    case "mp3":
    case "wav":
    case "ogg":
      return "vscode-icons:file-type-audio";
    case "js":
    case "jsx":
      return "vscode-icons:file-type-js-official";
    case "ts":
    case "tsx":
      return "vscode-icons:file-type-typescript-official";
    case "html":
      return "vscode-icons:file-type-html";
    case "css":
      return "vscode-icons:file-type-css";
    case "json":
      return "vscode-icons:file-type-json";
    case "xml":
      return "vscode-icons:file-type-xml";
    case "md":
      return "vscode-icons:file-type-markdown";
    case "c":
      return "vscode-icons:file-type-c3";
    case "c++":
    case "cpp":
      return "vscode-icons:file-type-cpp3";
    case "sql":
      return "vscode-icons:file-type-sql";
    case "py":
      return "vscode-icons:file-type-python";
    case "exe":
      return "vscode-icons:file-type-binary";
    default:
      return "vscode-icons:default-file";
  }
};
