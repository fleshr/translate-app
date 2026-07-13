export const nameRegex = /^@name chara="(?<name>.+)"$/dgm;
export const textRegex = /^(?<text>[^@*;[\r\n]+)$/dgm;
export const scriptRegex = /(?<script>@iscript.*?@endscript)/dgs;
