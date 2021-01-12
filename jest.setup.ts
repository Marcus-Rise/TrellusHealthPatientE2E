import { toMatchImageSnapshot } from "jest-image-snapshot";
import dotenv from "dotenv-flow";

expect.extend({ toMatchImageSnapshot });

dotenv.config();

jest.setTimeout(30000);
