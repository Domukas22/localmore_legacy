//

const base_URL = import.meta.env.PROD
  ? "https://localmore-production.up.railway.app"
  : "http://192.168.178.32:3001";

export { base_URL };
