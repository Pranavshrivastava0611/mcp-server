import axios from "axios";

/**
 * Forwards a request to the MCP (command executor) server
 * @param {Object} data - The command and payload to forward
 * @returns {Promise<Object>} - The response from the MCP
 */
export async function forward(data) {
  try {
    const response = await axios.post("https://mcpserver-5w6w.onrender.com/api/mcp/execute", data);
    return response.data;
  } catch (err) {
    console.error("Error forwarding to MCP:", err.message);
    throw new Error("Failed to forward command to MCP");
  }
}
