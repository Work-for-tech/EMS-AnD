import { createSlice } from "@reduxjs/toolkit";

const panelSlice = createSlice({
  name: "panel",

  initialState: {
    name: "",
    panel: [],
    price: 0,
  },

  reducers: {
    initial(state, action) {
      state.name = "";
      state.panel = [];
      state.price = 0;
    },
    setPanelsName(state, action) {
      state.name = action.payload;
    },
    addPartName(state, action) {
      state.name = action.payload;
    },
    addPanel(state, action) {
      state.panel.push(action.payload);
    },
    addAmount(state, action) {
      state.price += action.payload;
    },
    deletePanel(state, action) {
      state.panel = state.panel.filter((item, i) => i !== action.payload);
    },
    replaceComponents(state, action) {
      state.panel[action.payload].components = action.payload.data;
    },
    setComponents(state, action) {
      state.panel[action.payload.index].components.push(action.payload.data);
    },
    deleteComponents(state, action) {
      state.panel[action.payload.index].components = state.panel[
        action.payload.index
      ].components.filter((item, i) => i !== action.payload.component_index);

      state.panel[action.payload.index].completed_components_data.map(
        (item, i) => {
          if (item.name === action.payload.name) {
            console.log(item.name, action.payload.name);
            console.log(state.panel[action.payload.index].completed_components);
            console.log(state.panel[action.payload.index].completed);

            state.panel[action.payload.index].completed_components =
              state.panel[action.payload.index].completed_components.filter(
                (iitem, i) => {
                  console.log(iitem, item._id);
                  if (iitem !== item._id) {
                    return iitem;
                  }
                }
              );

            state.panel[action.payload.index].completed =
              state.panel[action.payload.index].completed - 1;
          }
        }
      );

      state.panel[action.payload.index].completed_components_data = state.panel[
        action.payload.index
      ].completed_components_data.filter(
        (item, i) => item.name !== action.payload.name
      );
    },
    removeCompletedSubComponent(state, action) {
      state.panel[action.payload.index].components[
        action.payload.component_index
      ].completed =
        state.panel[action.payload.index].components[
          action.payload.component_index
        ].completed - 1;

      // remove data from completed_subcomponents_data by id
      state.panel[action.payload.index].components[
        action.payload.component_index
      ].completed_subcomponents_data = state.panel[
        action.payload.index
      ].components[
        action.payload.component_index
      ].completed_subcomponents_data.filter(
        (item, i) => item._id !== action.payload.data
      );

      state.panel[action.payload.index].components[
        action.payload.component_index
      ].totalPrice =
        state.panel[action.payload.index].components[
          action.payload.component_index
        ].totalPrice - action.payload.totalPrice;
    },

    addCompletedSubComponent(state, action) {
      state.panel[action.payload.index].components[
        action.payload.component_index
      ].completed =
        state.panel[action.payload.index].components[
          action.payload.component_index
        ].completed + 1;

      state.panel[action.payload.index].components[
        action.payload.component_index
      ].completed_subcomponents_data.push(action.payload.subcomponent_data);

      state.panel[action.payload.index].components[
        action.payload.component_index
      ].totalPrice =
        state.panel[action.payload.index].components[
          action.payload.component_index
        ].totalPrice + action.payload.totalPrice;
    },
    deleteCompletedSubComponent(state, action) {
      state.panel[action.payload.index].components[
        action.payload.component_index
      ].completed =
        state.panel[action.payload.index].components[
          action.payload.component_index
        ].completed - 1;

      state.panel[action.payload.index].components[
        action.payload.component_index
      ].totalPrice =
        state.panel[action.payload.index].components[
          action.payload.component_index
        ].totalPrice - action.payload.totalPrice;

      if (
        state.panel[action.payload.index].components[
          action.payload.component_index
        ].completed < 0
      ) {
        state.panel[action.payload.index].components[
          action.payload.component_index
        ].completed = 0;
      }
    },
    addCompletedComponentSubComponent(state, action) {
      state.panel[action.payload.index].components[
        action.payload.component_index
      ].completed_subcomponents.push(action.payload.data);
    },
    removeCompletedComponentSubComponent(state, action) {
      console.log(
        action.payload.index,
        action.payload.data,
        action.payload.component_index
      );
      state.panel[action.payload.index].components[
        action.payload.component_index
      ].completed_subcomponents = state.panel[action.payload.index].components[
        action.payload.component_index
      ].completed_subcomponents.filter(
        (item, i) => item !== action.payload.data
      );
    },
    deleteCompletedComponentSubComponent(state, action) {
      state.panel[action.payload.index].components[
        action.payload.component_index
      ].completed_subcomponents = state.panel[action.payload.index].components[
        action.payload.component_index
      ].completed_subcomponents.filter(
        (item, i) => i !== action.payload.subcomponent_index
      );
    },
    addCompletedComponent(state, action) {
      console.log(action.payload.index);
      console.log(state.panel);
      state.panel[action.payload.index].completed =
        state.panel[action.payload.index].completed + 1;
      state.panel[action.payload.index].totalPrice =
        state.panel[action.payload.index].totalPrice +
        action.payload.totalPrice;
    },
    addCompletedComponentComponent(state, action) {
      state.panel[action.payload.index].completed_components.push(
        action.payload.data
      );
      state.panel[action.payload.index].completed_components_data.push(
        action.payload.completed_data
      );
    },
    addConsumable(state, action) {
      state.panel[action.payload.index].components[
        action.payload.index2
      ].consumables = action.payload.data;
      state.panel[action.payload.index].components[
        action.payload.index2
      ].subcomponents = action.payload.data;
    },
  },
});

export const panelActions = panelSlice.actions;
export default panelSlice;
