// O Prisma devolve Decimal; convertemos para número antes de enviar ao front-end.
export function toCourseDto(course) {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    thumbnail: course.thumbnail,
    price: Number(course.price),
    workload: course.workload,
    createdAt: course.createdAt,
  };
}
