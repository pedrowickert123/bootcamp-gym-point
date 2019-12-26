import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Paginator = styled.ul`
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.align === 'center' ? 'center' : 'flex-start'};

  li + li {
    margin-left: 10px;
  }

  li {
    cursor: pointer;
    transition: 0.2s;
    border-radius: 4px;
  }
`;

export const PagePrev = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;

  color: ${props => (props.active ? '#f0f3ff' : '#ee4d64')};
  background-color: ${props => (props.active ? '#ee4d64' : '#f0f3ff')};

  pointer-events: ${props => props.disabled && 'none'};
  opacity: ${props => props.disabled && 0.5};

  &:hover {
    background-color: #ee4d64;
    color: #fff;
  }
`;

export const PageItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 12px;

  color: ${props => (props.active ? '#fff' : '#ee4d64')};
  background-color: ${props => (props.active ? '#ee4d64' : '#fff')};

  &:hover {
    background-color: #ee4d64;
    color: #fff;
  }
`;

export const PageNext = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;

  color: ${props => (props.active ? '#f0f3ff' : '#ee4d64')};
  background-color: ${props => (props.active ? '#ee4d64' : '#f0f3ff')};

  pointer-events: ${props => props.disabled && 'none'};
  opacity: ${props => props.disabled && 0.5};

  &:hover {
    background-color: ${'#ee4d64'};
    color: #fff;
  }
`;

export const PaginatorInfo = styled.div`
  color: #666;
`;
