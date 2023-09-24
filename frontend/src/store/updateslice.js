import { createSlice } from "@reduxjs/toolkit";

const updatepanelSlice = createSlice({
  name: "updatepanel",

  initialState: {
    name: "",
    part_name: "",
    components: [],
    completed_components: [],
    profit_percentage: 0,
    price: 0,
    id: "",
    type: "",
  },

  reducers: {
    addInitialDetails(state, action) {
      state.name = action.payload.name;
      state.part_name = action.payload.part_name;
      state.profit_percentage = action.payload.profit_percentage;
      state.price = action.payload.price;
      state.components = action.payload.components;
      state.completed_components = action.payload.components.map((e) => e._id);
      state.id = action.payload.id;
      state.type = action.payload.type;
    },

    addPanel(state, action) {
      state.panel.push(action.payload);
    },

    addAmount(state, action) {
      state.price += action.payload;
    },

    deletePanel(state, action) {
      state.panel = state.panel.filter((item, i) => i !== action.payload);
      let newPrice = 0;
      console.log(state.panel);
      if (state.panel.length > 0) {
        state.panel.sub_components.map((element, index) => {
          newPrice +=
            (element.company.price -
              (element.company.price * element.company.discount) / 100) *
            element.quantity;
        });
      }

      if (newPrice < 0) newPrice = 0;
      state.price = newPrice;
    },
    replaceComponents(state, action) {
      state.panel[action.payload].components = action.payload.data;
    },

    setComponents(state, action) {
      state.components.push(action.payload.data);
    },

    deleteComponents(state, action) {
      state.components = state.components.filter(
        (item, i) => i !== action.payload.component_index
      );
      state.completed_components = state.completed_components.filter(
        (item, i) => i !== action.payload.component_index
      );
    },

    addCompletedSubComponent(state, action) {
      state.components[action.payload.component_index].sub_components[
        action.payload.sub_index
      ] = action.payload.data;

      state.components[action.payload.component_index].completed_subcomponents[
        action.payload.sub_index
      ] = action.payload._id;

      state.components[action.payload.component_index].price =
        state.components[action.payload.component_index].price -
        action.payload.oldPrice +
        action.payload.newPrice;
    },

    addCompletedConsumables(state, action) {
      state.components[action.payload.component_index].sub_components.push(
        action.payload.data
      );

      state.components[
        action.payload.component_index
      ].completed_subcomponents.push(action.payload._id);

      state.components[action.payload.component_index].price +=
        action.payload.price;
    },

    addCompletedComponentSubComponent(state, action) {
      state.panel[action.payload.index].components[
        action.payload.component_index
      ].completed_subcomponents.push(action.payload.data);
    },

    deleteCompletedSubComponent(state, action) {
      state.components[action.payload.component_index].price =
        state.components[action.payload.component_index].price -
        action.payload.totalPrice;

      if (state.components[action.payload.component_index].price < 0) {
        state.components[action.payload.component_index].price = 0;
      }

      state.components[action.payload.component_index].sub_components =
        state.components[action.payload.component_index].sub_components.filter(
          (item, i) => i !== action.payload.sub_index
        );

      state.components[action.payload.component_index].completed_subcomponents =
        state.components[
          action.payload.component_index
        ].completed_subcomponents.filter(
          (item, i) => i !== action.payload.sub_index
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

    addCompletedComponentNew(state, action) {
      state.completed_components.push(action.payload.data);
    },

    addCompletedComponentOld(state, action) {
      state.completed_components[action.payload.component_index] =
        action.payload.data;
    },

    addConsumable(state, action) {
      console.log(action.payload);
      state.components[action.payload.index2].sub_components =
        action.payload.data;
      state.components[action.payload.index2].completed_subcomponents =
        action.payload.subComponentIDS;
      state.components[action.payload.index2].completed =
        action.payload.data.length;
    },
  },
});

export const updatepanelActions = updatepanelSlice.actions;
export default updatepanelSlice;
