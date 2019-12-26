import styled from 'styled-components';

export const Content = styled.div`
  max-width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  table {
    width: 100%;
    border-spacing: 0;

    thead {
      th {
        padding-bottom: 15px;
        text-align: left;
        font-size: 16px;
        font-weight: bold;
      }
    }

    tbody {
      tr {
        td {
          padding: 15px 0;
          font-size: 16px;
          color: #666;
          border-bottom: 1px solid #eee;

          &:last-child {
            text-align: right;

            span {
              cursor: pointer;
              & + span {
                margin-left: 20px;
              }
            }
          }
        }
      }
    }
  }
`;
