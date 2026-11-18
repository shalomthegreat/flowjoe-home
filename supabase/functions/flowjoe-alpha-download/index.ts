import {createAlphaDownloadHandler} from "./handler.mjs";
Deno.serve(createAlphaDownloadHandler({codeHash: Deno.env.get("FLOWJOE_ALPHA_DOWNLOAD_CODE_SHA256")}));
