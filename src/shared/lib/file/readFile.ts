function readFile(file: File): Promise<string>;
function readFile(file: File, type: "string"): Promise<string>;
function readFile(file: File, type: "array"): Promise<Uint8Array>;
function readFile(file: File, type: "string" | "array" = "string") {
  return new Promise<Uint8Array | string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      const content = e.target?.result ?? "";

      resolve(
        content instanceof ArrayBuffer ? new Uint8Array(content) : content,
      );
    });

    reader.addEventListener("error", () => {
      reject(new Error("File read error"));
    });

    reader[type === "array" ? "readAsArrayBuffer" : "readAsText"](file);
  });
}

export { readFile };
