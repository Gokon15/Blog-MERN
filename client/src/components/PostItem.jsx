import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { CommentRounded } from "@mui/icons-material";
import PropTypes from "prop-types";

const PostItem = ({post}) => {
    if (!post) {
        return (
            <div className={'flex items-center justify-center '}>
                <div>
                    <p data-testid='emptyP'/>
                </div>
            </div>
        )
    }
    return (
        <div className={''}>
            <Link to={`/${post._id}`}>
                <div className='block flex-col basis-1/4 flex-grow bg-white p-6 rounded'>
                    <div
                        className={
                            post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'
                        }
                    >
                        {post.imgUrl && (
                            <img
                                src={`http://localhost:3002/${post.imgUrl}`}
                                alt='img'
                                className='object-cover w-full rounded border-solid border border-black-300'
                            />
                        )}
                    </div>
                    <div className='flex justify-between items-center pt-2'>
                        <div className='text-xs text-black opacity-50'>
                            {post.username}
                        </div>
                        <div className='text-xs text-black  opacity-50'>
                            <Moment date={post.createdAt} format='D MMM YYYY'/>
                        </div>
                    </div>
                    <div className='text-black  text-xl'>{post.title}</div>
                    <p className='text-black opacity-60 text-xs pt-4 line-clamp-4'>
                        {post.text}
                    </p>

                    <div className='flex gap-3 items-center mt-2'>
                        <button className='flex items-center justify-center gap-2 text-xs text-black  opacity-50'>
                            <VisibilityRoundedIcon fontSize="small"/> <span>{post.views}</span>
                        </button>
                        <button className='flex items-center justify-center gap-2 text-xs text-black  opacity-50'>
                            <CommentRounded fontSize="small"/>
                            <span className={''}>{post.comments?.length || 0} </span>
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    )
}


PostItem.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }),
};

export default PostItem;