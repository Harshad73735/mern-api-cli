#!/usr/bin/env node
import chalk from "chalk";

const [,, method, url, bodyArg, headersArg] = process.argv;

if (!method || !url) {
  console.log(chalk.yellow("Usage: mern-test <METHOD> <URL> [BODY_JSON] [HEADERS_JSON]"));
  console.log(chalk.gray("Example: mern-test POST http://localhost:5000/api/users \"{\\\"id\\\":1,\\\"name\\\":\\\"Harshad\\\"}\" \"{\\\"Authorization\\\":\\\"Bearer token\\\"}\""));
  process.exit(1);
}

(async () => {
  try {
    const options = {
      method: method.toUpperCase(),
      headers: { "Content-Type": "application/json" }
    };

    // Parse body JSON if provided
    if (bodyArg) {
      try {
        options.body = JSON.stringify(JSON.parse(bodyArg));
      } catch {
        console.error(chalk.red("Invalid JSON body format"));
        process.exit(1);
      }
    }

    // Parse headers JSON if provided
    if (headersArg) {
      try {
        const customHeaders = JSON.parse(headersArg);
        options.headers = { ...options.headers, ...customHeaders };
      } catch {
        console.error(chalk.red("Invalid JSON headers format"));
        process.exit(1);
      }
    }

    const start = Date.now();
    const res = await fetch(url, options);
    const duration = Date.now() - start;

    const text = await res.text();

    console.log(chalk.cyan(`\n ${options.method} ${url}`));
    console.log(chalk.magenta(` Response time: ${duration}ms`));
    console.log(chalk.blue(` Status: ${res.status} ${res.statusText}`));

    // Pretty print JSON if possible
    try {
      console.log(chalk.green("\nResponse:"));
      console.log(JSON.stringify(JSON.parse(text), null, 2));
    } catch {
      console.log(chalk.green("\nResponse:"));
      console.log(text);
    }
  } catch (err) {
    console.error(chalk.red(" Error:"), err.message);
  }
})();
