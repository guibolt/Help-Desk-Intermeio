export const toast = {
  data: function() {
    return {
      sucesso: {
        position: "topRight",
        iconColor: "white",
        class: "alert alert-success alert-dismissible",
        theme: "dark",
        icon: "icon fa fa-check"
      },
      error: {
        position: "topRight",
        iconColor: "white",
        class: "alert alert-danger alert-dismissible",
        theme: "dark",
        icon: "icon fa fa-ban"
      }
    };
  }
};
