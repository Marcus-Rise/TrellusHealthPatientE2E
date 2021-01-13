const SCREEN_SHOT_BASE_DIR = "screenshots";

const getScreenShot = (name?: string): Promise<Buffer> => {
  const path = name ? `${SCREEN_SHOT_BASE_DIR}/${name}.png` : undefined;

  return page.screenshot({
    fullPage: true,
    path,
  });
};

export { getScreenShot };
