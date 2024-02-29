//

const base_URL = import.meta.env.PROD
  ? "https://localmore-production.up.railway.app"
  : "http://localhost:3001";

export { base_URL };
