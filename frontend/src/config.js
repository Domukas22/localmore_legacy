//

const database_URL = import.meta.env.PROD
  ? "https://localmore-production.up.railway.app"
  : "http://192.168.178.32:3001";

const base_PATH = import.meta.env.PROD ? "/localmore_legacy" : "";

export { database_URL, base_PATH };
