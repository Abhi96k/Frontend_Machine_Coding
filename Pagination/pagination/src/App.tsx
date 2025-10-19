import { useEffect, useState, type ReactElement } from "react";
import styles from "./styles.ts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App(): ReactElement {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const postsPerPage = 10;

  useEffect(() => {
    // fetch posts once on mount
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await fetch("https://jsonplaceholder.typicode.com/posts");
        const postsJson: Post[] = await data.json();
        setPosts(postsJson);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: 40 }}>Loading...</h2>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pagination Example (JSONPlaceholder)</h1>

      <ul style={styles.list}>
        {currentPosts.map((post) => (
          <li key={post.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{post.title}</h3>
            <p style={styles.cardBody}>{post.body}</p>
          </li>
        ))}
      </ul>

      <div style={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={styles.button}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            style={{
              ...styles.pageButton,
              backgroundColor:
                currentPage === index + 1 ? "#007bff" : "#f0f0f0",
              color: currentPage === index + 1 ? "white" : "black",
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          style={styles.button}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
