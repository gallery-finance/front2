import React from "react";

export const WorkshopVoterPage = () => {
    return (
        <article className="center">
            <div className="center">
                <ul
                    className="breadcrumbs hidden-sm"
                    itemscope=""
                    itemtype="https://schema.org/BreadcrumbList"
                >
                    <li
                        className="breadcrumbs__item"
                        itemprop="itemListElement"
                        itemscope=""
                        itemtype="https://schema.org/ListItem"
                    >
                        <a className="breadcrumbs__link" href="/" itemprop="item">
                            <span itemprop="name">Home</span>
                        </a>
                        <meta itemprop="position" content="1" />
                    </li>

                    <li
                        className="breadcrumbs__item"
                        itemprop="itemListElement"
                        itemscope=""
                        itemtype="https://schema.org/ListItem"
                    >
                        <a className="breadcrumbs__link" href="/" itemprop="item">
                            <span itemprop="name">Workshops</span>
                        </a>
                        <meta itemprop="position" content="2" />
                    </li>

                    <li
                        className="breadcrumbs__item"
                        itemprop="itemListElement"
                        itemscope=""
                        itemtype="https://schema.org/ListItem"
                    >
                        <span itemprop="name">Voter</span>
                        <link
                            itemprop="item"
                            href="http://gf.wndrbase.com/workshop/voter"
                        />
                        <meta itemprop="position" content="3" />
                    </li>
                </ul>
            </div>
            <header className="voter-head">
                <h1 className="voter-head__title h3">Figures</h1>
                <div className="voter-head__dashboard">
                    <div className="voter-head__dashboard-account">
                        <div className="voter-head__dashboard-ico">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M2 9h19a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V9zm1-6h15v4H2V4a1 1 0 011-1zm12 11v2h3v-2h-3z"></path>
                            </svg>
                        </div>
                        <a className="link" href="/">
                            Account
                        </a>
                    </div>
                    <div className="voter-head__dashboard-power">
                        <p>
                            Your Voting Power: <b>100 GLF</b>
                        </p>
                    </div>
                    <div className="voter-head__dashboard-btn">
                        <button type="button" className="btn" data-modal="vote-new">
                            Propose a figure
                        </button>
                    </div>
                </div>
            </header>
            <div className="voter-table">
                <table>
                    <thead>
                        <tr>
                            <th>Ranking</th>
                            <th>Name</th>
                            <th className="voter-table__col-max-width hidden-sm">
                                Details
                            </th>
                            <th>Total Votes</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#1</td>
                            <td>Jacob Jones</td>
                            <td className="hidden-sm">
                                <div className="voter-table__details">
                                    <p className="voter-table__details-inner">
                                        Amet minim mollit non deserunt ullamco est
                                        sit aliqua dolor do amet sint. Velit officia
                                        consequat duis enim velit mollit.
                                        Exercitation veniam consequat sunt nostrud
                                        amet.
                                    </p>
                                </div>
                            </td>
                            <td>1000 GLF</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn--vote"
                                    data-modal="vote"
                                >
                                    Vote
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#2</td>
                            <td>Annette Black</td>
                            <td className="hidden-sm">
                                <div className="voter-table__details">
                                    <p className="voter-table__details-inner">
                                        Amet minim mollit non deserunt ullamco est
                                        sit aliqua dolor do amet sint. Velit officia
                                        consequat duis enim velit mollit.
                                        Exercitation veniam consequat sunt nostrud
                                        amet.
                                    </p>
                                </div>
                            </td>
                            <td>1000 GLF</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn--vote"
                                    data-modal="vote"
                                >
                                    Vote
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#3</td>
                            <td>Darrell Steward</td>
                            <td className="hidden-sm">
                                <div className="voter-table__details">
                                    <p className="voter-table__details-inner">
                                        Amet minim mollit non deserunt ullamco est
                                        sit aliqua dolor do amet sint. Velit officia
                                        consequat duis enim velit mollit.
                                        Exercitation veniam consequat sunt nostrud
                                        amet.
                                    </p>
                                </div>
                            </td>
                            <td>1000 GLF</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn--vote"
                                    data-modal="vote"
                                >
                                    Vote
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#4</td>
                            <td>Ralph Edwards</td>
                            <td className="hidden-sm">
                                <div className="voter-table__details">
                                    <p className="voter-table__details-inner">
                                        Amet minim mollit non deserunt ullamco est
                                        sit aliqua dolor do amet sint. Velit officia
                                        consequat duis enim velit mollit.
                                        Exercitation veniam consequat sunt nostrud
                                        amet.
                                    </p>
                                </div>
                            </td>
                            <td>1000 GLF</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn--vote"
                                    data-modal="vote"
                                >
                                    Vote
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#5</td>
                            <td>Darlene Robertson</td>
                            <td className="hidden-sm">
                                <div className="voter-table__details">
                                    <p className="voter-table__details-inner">
                                        Amet minim mollit non deserunt ullamco est
                                        sit aliqua dolor do amet sint. Velit officia
                                        consequat duis enim velit mollit.
                                        Exercitation veniam consequat sunt nostrud
                                        amet.
                                    </p>
                                </div>
                            </td>
                            <td>1000 GLF</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn--vote"
                                    data-modal="vote"
                                >
                                    Vote
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#6</td>
                            <td>Cameron Williamson</td>
                            <td className="hidden-sm">
                                <div className="voter-table__details">
                                    <p className="voter-table__details-inner">
                                        Amet minim mollit non deserunt ullamco est
                                        sit aliqua dolor do amet sint. Velit officia
                                        consequat duis enim velit mollit.
                                        Exercitation veniam consequat sunt nostrud
                                        amet.
                                    </p>
                                </div>
                            </td>
                            <td>1000 GLF</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn--vote"
                                    data-modal="vote"
                                >
                                    Vote
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#7</td>
                            <td>Courtney Henry</td>
                            <td className="hidden-sm">
                                <div className="voter-table__details">
                                    <p className="voter-table__details-inner">
                                        Amet minim mollit non deserunt ullamco est
                                        sit aliqua dolor do amet sint. Velit officia
                                        consequat duis enim velit mollit.
                                        Exercitation veniam consequat sunt nostrud
                                        amet.
                                    </p>
                                </div>
                            </td>
                            <td>1000 GLF</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn--vote"
                                    data-modal="vote"
                                >
                                    Vote
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
    );
};
