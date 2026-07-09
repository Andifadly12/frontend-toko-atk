const handleSubmitData = ({
  e,
  schema,
  form,
  editId,
  data,
  setData,
  setErrors,
  closeModal,
}) => {
  e.preventDefault();

  const result = schema.safeParse(form);

  if (!result.success) {
    const fieldErrors = {};

    result.error.issues.forEach(issue => {
      fieldErrors[issue.path[0]] = issue.message;
    });

    setErrors(fieldErrors);
    return;
  }

  setErrors({});

  const validatedData = result.data;

  if (editId) {
    const updatedData = data.map(item =>
      item.id === editId
        ? {
            ...item,
            ...validatedData,
          }
        : item,
    );

    setData(updatedData);
  } else {
    const newData = {
      id: Date.now(),
      ...validatedData,
    };

    setData([newData, ...data]);
  }

  closeModal();
};

export default handleSubmitData;
