import { useState, useEffect } from 'react'
import { Trash2, Star } from 'lucide-react'
import AdminLayout from './AdminLayout'
import useAuthStore from '../../store/authStore'
import API_URL from '../../api/config'

function AdminReviews() {
  const { user } = useAuthStore()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    let mounted = true

    const loadReviews = async () => {
      if (!user?.token) return

      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/reviews`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        const data = await res.json()
        if (mounted) {
          setReviews(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadReviews()

    return () => {
      mounted = false
    }
  }, [user?.token])

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Delete this review?')) return
    setDeletingId(reviewId)
    try {
      await fetch(`${API_URL}/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setReviews(reviews.filter((r) => r._id !== reviewId))
    } catch (err) {
      console.error(err)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">

        <div>
          <h1 className="text-white text-xl sm:text-2xl font-black uppercase tracking-wider">Reviews</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">{reviews.length} total reviews</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-zinc-600 text-xs tracking-widest uppercase text-center py-20">No reviews yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {reviews.map((review) => (
              <div key={review._id} className="bg-black border border-zinc-800 p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <p className="text-white text-xs font-bold tracking-wider uppercase">{review.name}</p>
                      <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            className={star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-700'}
                          />
                        ))}
                      </div>
                      <p className="text-zinc-600 text-xs">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="text-zinc-400 text-xs tracking-wider leading-relaxed mb-2">{review.comment}</p>
                    {review.product && (
                      <p className="text-zinc-600 text-xs tracking-wider">
                        Product ID: {review.product}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(review._id)}
                    disabled={deletingId === review._id}
                    className={`shrink-0 p-2 border border-zinc-700 transition-all duration-300 ${
                      deletingId === review._id
                        ? 'opacity-50 cursor-not-allowed text-zinc-600'
                        : 'text-zinc-400 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminReviews