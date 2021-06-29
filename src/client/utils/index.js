const delayed = cb => {
    setTimeout(() => cb(), 2000);
};

export { delayed };
