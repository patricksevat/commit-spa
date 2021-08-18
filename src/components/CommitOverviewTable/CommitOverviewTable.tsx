import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow, Toolbar
} from '@material-ui/core';
import { CommitOverviewListItem } from '../CommitOverviewListItem/CommitOverviewListItem';
import React from 'react';
import { CommitContext } from '../../hooks/CommitContext';
import { TranslationContext } from '../../hooks/TranslationContext';
import { CommitOverviewTableFilters } from '../CommitOverviewTableFilters/CommitOverviewTableFilters';
import './CommitOverviewTable.scss'

export const CommitOverviewTable = () => {
  const { translate } = React.useContext(TranslationContext);
  const commitState = React.useContext(CommitContext);
  const { commits, numberOfPages, currentPage, setCurrentPage } = commitState;

  function handleChangePage(event: any, newPage: number) {
    setCurrentPage && setCurrentPage(newPage);
  }

  return(
    <Paper>
      <Toolbar disableGutters={true}>
        <CommitOverviewTableFilters/>
      </Toolbar>
      <TableContainer id='commit-overview-table'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='commit-overview-table__header-cell'>
                { translate('message') }
              </TableCell>
              <TableCell className='commit-overview-table__header-cell'>
                { translate('date') }
              </TableCell>
              <TableCell className='commit-overview-table__header-cell'>
                { translate('author') }
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commits.map((commit) =>
              <CommitOverviewListItem key={commit.sha} commit={commit}/>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={numberOfPages || 1}
        rowsPerPage={10}
        page={currentPage}
        onPageChange={handleChangePage}
      />
    </Paper>
  )
}
