export const createControllerView = (Controller, View) => (props) => ({
    context
}) => {
    const view = new View();
    const controller = new Controller(view, context);
	
    controller.mount(props, context);

    return controller;
};

export default createControllerView;
