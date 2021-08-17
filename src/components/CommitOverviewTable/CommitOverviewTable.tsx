import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import { CommitOverviewListItem } from '../CommitOverviewListItem/CommitOverviewListItem';
import React from 'react';
import { CommitContext } from '../../hooks/CommitContext';
import { TranslationContext } from '../../hooks/TranslationContext';

export const CommitOverviewTable = () => {
  const { translate } = React.useContext(TranslationContext);
  const commitState = React.useContext(CommitContext);
  const { commits, numberOfPages, currentPage, setCurrentPage } = commitState;

  function handleChangePage(event: any, newPage: number) {
    setCurrentPage && setCurrentPage(newPage);
  }

  return(
    <>
      <TableContainer id='commit-overview-table' component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                { translate('message') }
              </TableCell>
              <TableCell>
                { translate('date') }
              </TableCell>
              <TableCell>
                { translate('author') }
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commits.map((commit) =>
              <CommitOverviewListItem key={commit.sha} message={commit.commit.message} date={commit.commit.author.formattedDate} author={commit.author.login}/>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={numberOfPages || 0}
        rowsPerPage={10}
        page={currentPage}
        onPageChange={handleChangePage}
      />
    </>
  )
}
