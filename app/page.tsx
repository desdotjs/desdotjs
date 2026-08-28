"use client";

import { useEffect } from "react";
import { posts } from "@/data/posts";
import type { Post } from "@/types/post";

export default function Home() {

  return (
    <>

      <div className="page-header-container">

        <div className="page-header-bar">

          <p>list / grid view</p>
          <p>desdotjs.com</p>
          <p>social icons</p>

        </div>

      </div>

      <div className="profile-header-container">

        <div className="pfp">

        </div>

        <div className="profile-info">

          <div className="profile-nav-buttons">

            <ul>
              <li>archive</li>
              <li>documentation</li>
              <li>contact</li>

            </ul>

          </div>

        </div>

      </div>

      <div className="post-tile-wrapper">

        <div className="post-tile">

          <div className="post-body">

            <div className="post-media-2">
              {/* canvas or img */}
            </div>

            <div className="post-actions">
              <div className="action-upvote">▲</div>
              <div className="action-bookmark">▢</div>
              <div className="action-message">✉</div>
            </div>

          </div>

          <div className="post-meta">
            <span className="post-title">Title</span>
            <span className="post-date">date</span>
            <p className="post-description">Description goes here</p>
          </div>

        </div>

      </div>

      <div className="post-tile-wrapper">

        <div className="post-tile">

          <div className="post-body">

            <div className="post-media">
              {/* canvas or img */}
            </div>

            <div className="post-actions">
              <div className="action-upvote">▲</div>
              <div className="action-bookmark">▢</div>
              <div className="action-message">✉</div>
            </div>

          </div>

          <div className="post-meta">
            <span className="post-title">Title</span>
            <span className="post-date">date</span>
            <p className="post-description">Description goes here</p>
          </div>

        </div>

      </div>

      <div className="footer">

      </div>

    </>
  );
}