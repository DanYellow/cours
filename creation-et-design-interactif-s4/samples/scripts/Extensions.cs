using UnityEngine;
using System.Collections;

// https://learn.unity.com/tutorial/extension-methods#
public static class Extensions
{
   /// <summary>
   /// Makes a GameObject move back and forth between its initial position and a defined position
   /// </summary>
   /// <param name="transform">GameObject's transform</param>
   /// <param name="endPosition">End position</param>
   /// <returns>IEnumerator</returns>
    public static IEnumerator MoveBackAndForth(this Transform transform, Vector3 endPosition, float duration = 0.125f) {
        Vector3 initialPosition = transform.localPosition;

        yield return Move(transform, initialPosition, endPosition);
        yield return Move(transform, endPosition, initialPosition);
    }

    /// <summary>
    /// Moves a GameObject between two positions
    /// </summary>
    /// <param name="transform">GameObject's transform</param>
    /// <param name="from">Initial position</param>
    /// <param name="to">End position</param>
    /// <returns>IEnumerator</returns>
    public static IEnumerator Move(this Transform transform, Vector3 from, Vector3 to, float duration = 0.125f)
    {
        float elapsed = 0f;

        while (elapsed < duration)
        {
            float t = elapsed / duration;

            transform.localPosition = Vector3.Lerp(from, to, t);
            elapsed += Time.deltaTime;

            yield return null;
        }

        transform.localPosition = to;
    }
}