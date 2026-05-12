import Container from './Container';

export default function SectionShell({
  id,
  as: Tag = 'section',
  className = '',
  containerClassName = '',
  children,
}) {
  return (
    <Tag id={id} className={className}>
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
