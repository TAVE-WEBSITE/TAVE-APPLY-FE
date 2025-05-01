function convertToFullYear(dateStr: string): string {
  if (!/^\d{6}$/.test(dateStr)) {
    throw new Error("Invalid format: must be 6 digits like '010101'");
  }

  const yy = dateStr.slice(0, 2);
  const mm = dateStr.slice(2, 4);
  const dd = dateStr.slice(4, 6);

  const yearPrefix = parseInt(yy, 10) < 30 ? "20" : "19"; // 1930 기준
  return `${yearPrefix}${yy}-${mm}-${dd}`;
}

export { convertToFullYear };
