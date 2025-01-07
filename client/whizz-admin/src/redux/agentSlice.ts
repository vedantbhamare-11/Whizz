import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure for an Agent
interface Agent {
  id: number;
  agent_name: string;
  agent_mobile: string;
  covered_area: string;
  is_available: boolean;
  current_status: "assigned" | "unassigned";
}

// Define the structure for the slice's state
interface AgentState {
  agents: Agent[];
}

// Initial state adhering to the AgentState type
const initialState: AgentState = {
  agents: [
    {
      id: 1,
      agent_name: "Yugi",
      agent_mobile: "+123456789",
      covered_area: "Nungambakkam",
      is_available: true,
      current_status: "unassigned",
    },
    {
      id: 2,
      agent_name: "Yasar",
      agent_mobile: "+987654321",
      covered_area: "Anna Nagar",
      is_available: true,
      current_status: "unassigned",
    },
    {
      id: 3,
      agent_name: "Vedant",
      agent_mobile: "+456789123",
      covered_area: "Nungambakkam",
      is_available: false,
      current_status: "assigned",
    },
  ],
};

const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    // Update the agent's status and availability
    updateAgentStatus: (
      state,
      action: PayloadAction<{ id: number; status: "assigned" | "unassigned" }>
    ) => {
      const { id, status } = action.payload;
      const agent = state.agents.find((agent) => agent.id === id);
      if (agent) {
        agent.current_status = status;
        agent.is_available = status === "unassigned";
      }
    },
  },
});

export const { updateAgentStatus } = agentSlice.actions;
export default agentSlice.reducer;
