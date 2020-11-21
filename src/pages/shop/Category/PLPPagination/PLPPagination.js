import React from "react";
// import Pagination from 'react-bootstrap/Pagination';

import './PLPPagination.scss';
import {T} from "@market-ui/falcon-i18n";

const startNumber = 1;

// props.pagingInfo = {
//     currentPage: number;
//     totalItems: number;
//     itemsPerPage: number;
// }

export class PLPPagination extends React.Component {

    get pageCount() {
        return Math.ceil(this.props.pagingInfo.totalItems / this.props.pagingInfo.itemsPerPage);
    }

    get pageFirstNo() {
        return (this.props.pagingInfo.currentPage - 1) * this.props.pagingInfo.itemsPerPage + 1;
    }

    constructor(props) {
        super(props);
    }

    getLastNumber() {
        let lastNumber = this.pageFirstNo - 1 + this.props.pagingInfo.itemsPerPage;
        return lastNumber <= this.props.pagingInfo.totalItems ? lastNumber : this.props.pagingInfo.totalItems;
    }

    gradeOutRangeNumbers(num) {
        if (num < startNumber || num > this.pageCount) {
            return this.props.pagingInfo.currentPage;
        }
        return num;
    }

    changePage = (pageNum) => {
        let newPageNum = this.gradeOutRangeNumbers(pageNum);
        if (newPageNum !== this.props.pagingInfo.currentPage) {
            this.props.onChange(newPageNum);
        }
    };

    render() {
        let items = [];
        // if (this.props.pagingInfo.currentPage !== 1) {
        //     items.push(
        //         <Pagination.Prev key={startNumber - 1}
        //                          className='pagination-prev'
        //                          onClick={() => this.changePage(this.props.pagingInfo.currentPage - 1)}
        //         >
        //             <T id="pagination.prev"/>
        //         </Pagination.Prev>
        //     );
        // }

        // for (let num = startNumber; num <= this.pageCount; num++) {
        //     items.push(
        //         <Pagination.Item key={num}
        //                          active={num === this.props.pagingInfo.currentPage}
        //                          onClick={() => this.changePage(num)}
        //         >
        //             {num}
        //         </Pagination.Item>,
        //     );
        // }
        // if (this.props.pagingInfo.currentPage !== this.pageCount) {
        //     items.push(
        //         <Pagination.Next key={this.pageCount + 1}
        //                          className='pagination-next'
        //                          onClick={() => this.changePage(this.props.pagingInfo.currentPage + 1)}
        //         >
        //             <T id="pagination.next"/>
        //         </Pagination.Next>
        //     );
        // }

        return (
            <div className='pagination-block-wrap'>
                {this.props.pagingInfo.totalItems > this.props.pagingInfo.itemsPerPage ?
                    <div>
                        {/* <Pagination size="sm"> */}
                            {items}
                        {/* </Pagination> */}
                    </div> : null
                }
            </div>
        );
    }
}
