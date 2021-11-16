export default function cutOverflowContent(selector) {
  const overviewBlocks = document.getElementById(selector);
  while (overviewBlocks.scrollHeight > overviewBlocks.clientHeight) {
    const lastSpace = overviewBlocks.textContent.lastIndexOf(' ');
    overviewBlocks.textContent = `${overviewBlocks.textContent.slice(0, lastSpace)}...`;
  }
}
