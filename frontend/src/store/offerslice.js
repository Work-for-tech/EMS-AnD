import { createSlice } from "@reduxjs/toolkit";

const offerSlice = createSlice({
  name: "offer",

  initialState: {
    projectName: {
      label: "Select Project",
      value: "",
    },
    clientName: {
      label: "Select Client",
      value: "",
    },
    DescriptionOfPanel: "",
    QtyOfPanel: 1,
    panels_to_be_created: [],
    panelsData: [],
    price: 0,
    id: "",
    projectId: "",
  },

  reducers: {
    setInitials(state, action) {
      state.projectName = {
        label: "Select Project",
        value: "",
      };
      state.clientName = {
        label: "Select Client",
        value: "",
      };
      state.DescriptionOfPanel = "";
      state.QtyOfPanel = 1;
      state.panels_to_be_created = [];
      state.panelsData = [];
      state.price = 0;
      state.id = "";
      state.projectId = "";
    },
    setUpdationData(state, action) {
      console.log(action.payload);
      if (action.payload.projectName.value !== undefined) {
        state.projectName = action.payload.projectName;
        state.clientName = action.payload.clientName;
        state.DescriptionOfPanel = action.payload.DescriptionOfPanel;
        state.QtyOfPanel = action.payload.QtyOfPanel;
        state.panels_to_be_created = action.payload.panels_to_be_created;
      }
      state.id = action.payload.id;
    },
    setInitialDetails(state, action) {
      state.projectName = action.payload.projectName;
      state.clientName = action.payload.clientName;
      state.DescriptionOfPanel = action.payload.DescriptionOfPanel;
      state.QtyOfPanel = action.payload.QtyOfPanel;
      state.id = action.payload.id;
      state.projectId = action.payload.projectId;
    },
    setProjectId(state, action) {
      state.projectId = action.payload;
    },
    setPanelsData(state, action) {
      state.panelsData.push(action.payload);
    },
    setReplacePanel: (state, action) => {
      const panelToUpdate = state.panels_to_be_created.find(
        (panel) => panel.name === action.payload.name
      );

      if (panelToUpdate) {
        const partToUpdate = panelToUpdate.parts.find(
          (part) => part.part_name === action.payload.part_name
        );

        if (partToUpdate) {
          partToUpdate.components = action.payload.components;
          partToUpdate.price = action.payload.price;
          partToUpdate.profit_percentage = action.payload.profit_percentage;
          partToUpdate.profit = action.payload.profit;
          partToUpdate.total_price = action.payload.total_price;
        }
      }
    },
    setReplacePanelsData(state, action) {
      state.panelsData.map((element, index) => {
        if (element._id === action.payload.id) {
          element = action.payload.data;
        }
      });
    },
    setPanelsToBeCreated(state, action) {
      state.panels_to_be_created = action.payload.panels_to_be_created;
      state.id = action.payload.id;
    },
    setOfferId(state, action) {
      state.id = action.payload;
    },
  },
});

export const offerActions = offerSlice.actions;
export default offerSlice;
